import React, { useContext, useState } from 'react';
import { Search } from 'lucide-react';
import { AppContext } from '../context/AppContext.jsx';

function TreeNode({ member, members, navigateTo, GENDER_COLORS, searchTerm }) {
  const binaan = members.filter(m => m.mentorId === member.id);
  const genderColor = GENDER_COLORS[member.gender] || 'bg-slate-300';
  const isMatched = searchTerm && member.name.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <div className="flex flex-col items-center relative">
      <div
        onClick={() => navigateTo('profile_' + member.id)}
        className={`bg-white dark:bg-slate-900 border-2 rounded-2xl shadow-sm p-4 w-44 text-center cursor-pointer transition-all relative overflow-hidden group z-10 ${isMatched ? 'border-amber-400 shadow-amber-100 dark:shadow-amber-950 shadow-lg scale-105' : 'border-transparent hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1'}`}
      >
        <div className={`absolute top-0 left-0 w-full h-1.5 ${genderColor}`}></div>
        <div className="w-12 h-12 mx-auto bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center font-black text-slate-300 dark:text-slate-600 mb-3 border-2 border-white dark:border-slate-900 shadow-sm">
          {member.name.charAt(0)}
        </div>
        <div className="font-extrabold text-sm text-slate-800 dark:text-slate-100 truncate">{member.name.split(' ')[0]}</div>
        <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1">{member.group}</div>
      </div>

      {binaan.length > 0 && (
        <>
          <div className="w-0.5 h-8 bg-slate-200 dark:bg-slate-700"></div>
          <div className="flex gap-6 pt-4 border-t-2 border-slate-200 dark:border-slate-700 relative">
            {binaan.map(b => (
              <div key={b.id} className="relative flex flex-col items-center">
                <div className="absolute top-[-16px] w-0.5 h-4 bg-slate-200 dark:bg-slate-700"></div>
                <TreeNode member={b} members={members} navigateTo={navigateTo} GENDER_COLORS={GENDER_COLORS} searchTerm={searchTerm} />
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

  const roots = members.filter(m => !m.mentorId);

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
      <div className="overflow-auto bg-slate-100/50 dark:bg-slate-900/40 p-12 rounded-3xl border border-slate-200 dark:border-slate-800 flex justify-center shadow-inner relative">
        <div className="flex gap-16">
          {roots.map(root => (
            <TreeNode key={root.id} member={root} members={members} navigateTo={navigateTo} GENDER_COLORS={GENDER_COLORS} searchTerm={searchTerm} />
          ))}
        </div>
      </div>
    </div>
  );
}
