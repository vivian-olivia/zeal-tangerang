import React, { useContext, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';

// Groups members into "units" — a co-leader pair (two partnered members
// rendered side-by-side) or a single member — then figures out each unit's
// parent unit from mentor_id, so a co-leader never also gets rendered a
// second time as if they were their own partner's mentee.
function buildUnits(members) {
  const unitIdOfMember = {};
  members.forEach(m => {
    unitIdOfMember[m.id] = m.partnerId ? Math.min(m.id, m.partnerId) : m.id;
  });

  const unitsMap = {};
  members.forEach(m => {
    const uid = unitIdOfMember[m.id];
    if (!unitsMap[uid]) unitsMap[uid] = { id: uid, members: [] };
    unitsMap[uid].members.push(m);
  });
  Object.values(unitsMap).forEach(u => u.members.sort((a, b) => a.id - b.id));

  Object.values(unitsMap).forEach(u => {
    let parentUnitId = null;
    for (const m of u.members) {
      if (m.mentorId != null) {
        const mentorUnit = unitIdOfMember[m.mentorId];
        if (mentorUnit !== u.id) { parentUnitId = mentorUnit; break; }
      }
    }
    u.parentUnitId = parentUnitId;
  });

  return unitsMap;
}

function MemberCard({ member, navigateTo, GENDER_COLORS, searchTerm }) {
  const genderColor = GENDER_COLORS[member.gender] || 'bg-slate-300';
  const isMatched = searchTerm && member.name.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <div
      onClick={() => navigateTo('profile_' + member.id)}
      className={`bg-white dark:bg-slate-900 border-2 rounded-2xl shadow-sm p-4 w-44 text-center cursor-pointer transition-all relative overflow-hidden group z-10 ${isMatched ? 'border-amber-400 shadow-amber-100 dark:shadow-amber-950 shadow-lg scale-105' : 'border-transparent hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1'}`}
    >
      <div className={`absolute top-0 left-0 w-full h-1.5 ${genderColor}`}></div>
      <div className="w-12 h-12 mx-auto bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center font-black text-slate-300 dark:text-slate-600 mb-3 border-2 border-white dark:border-slate-900 shadow-sm">
        {member.name.charAt(0)}
      </div>
      <div className="font-extrabold text-sm text-slate-800 dark:text-slate-100 truncate">{member.name.split(' ')[0]}</div>
      <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1 truncate">{member.group}</div>
    </div>
  );
}

function UnitNode({ unit, childrenByParent, navigateTo, GENDER_COLORS, searchTerm }) {
  const kids = childrenByParent[unit.id] || [];

  return (
    <div className="flex flex-col items-center relative">
      <div className="flex items-center">
        {unit.members.map((m, idx) => (
          <React.Fragment key={m.id}>
            {idx > 0 && (
              <div className="flex items-center justify-center w-8 shrink-0 relative" title="Co-leader">
                <div className="h-0.5 w-full bg-indigo-200 dark:bg-indigo-800"></div>
                <div className="absolute w-2.5 h-2.5 rounded-full bg-indigo-400 dark:bg-indigo-500 border-2 border-slate-100 dark:border-slate-900"></div>
              </div>
            )}
            <MemberCard member={m} navigateTo={navigateTo} GENDER_COLORS={GENDER_COLORS} searchTerm={searchTerm} />
          </React.Fragment>
        ))}
      </div>

      {kids.length > 0 && (
        <>
          <div className="w-0.5 h-8 bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex gap-6 pt-4 border-t-2 border-slate-200 dark:border-slate-700 relative">
            {kids.map(k => (
              <div key={k.id} className="relative flex flex-col items-center">
                <div className="absolute top-[-16px] w-0.5 h-4 bg-slate-200 dark:bg-slate-700"></div>
                <UnitNode unit={k} childrenByParent={childrenByParent} navigateTo={navigateTo} GENDER_COLORS={GENDER_COLORS} searchTerm={searchTerm} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function DTree() {
  const { members, navigateTo, GENDER_COLORS } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const { roots, childrenByParent } = useMemo(() => {
    const unitsMap = buildUnits(members);
    const allUnits = Object.values(unitsMap);
    const byParent = {};
    allUnits.forEach(u => {
      if (u.parentUnitId != null) {
        (byParent[u.parentUnitId] ||= []).push(u);
      }
    });
    return { roots: allUnits.filter(u => u.parentUnitId == null), childrenByParent: byParent };
  }, [members]);

  return (
    <div className="p-5 md:p-10 min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
         <div>
           <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">D-Tree Family</h1>
           <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Peta silsilah pemuridan komunitas</p>
         </div>
         <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input
              type="text" placeholder="Cari nama..."
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 font-medium outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
         </div>
      </div>
      {/* Plain block layout + mx-auto (not flex justify-center) so that when the tree is
          wider than the viewport, overflow-auto can actually scroll to every branch —
          flexbox's justify-content: center clips overflow "unsafely" and can leave content
          unreachable by scroll on wide trees. */}
      <div className="overflow-auto bg-slate-100/50 dark:bg-slate-900/40 p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-inner relative">
        <div className="flex gap-16 w-fit mx-auto">
          {roots.map(root => (
            <UnitNode key={root.id} unit={root} childrenByParent={childrenByParent} navigateTo={navigateTo} GENDER_COLORS={GENDER_COLORS} searchTerm={searchTerm} />
          ))}
        </div>
      </div>
    </div>
  );
}
