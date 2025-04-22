"use client";

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useState, useEffect } from "react";
import Link from "next/link";
import { v4 as uuidV4 } from 'uuid';

const LCVP_GRADES = ['None', 'Distinction', 'Merit', 'Pass'] as const;
const GRADES = [1, 2, 3, 4, 5, 6, 7, 8] as const;

type Subject = {
  subject: string;
  uuid: string;
  disabled?: boolean;
} & (
  | {
      level: 'H' | 'O';
      grade: (typeof GRADES)[number];
      special?: 'maths';
    }
  | {
      special: 'LCVP';
      grade: (typeof LCVP_GRADES)[number];
    }
);

const calcPoints = (sub: Subject) => {
  const points = {
    H: [100, 88, 77, 66, 56, 46, 37, 0],
    O: [56, 46, 37, 28, 20, 12, 0, 0],
  };
  if (sub.disabled) return 0;

  if (sub.special === 'LCVP') {
    switch (sub.grade) {
      case 'None':
        return 0;
      case 'Distinction':
        return 66;
      case 'Merit':
        return 46;
      case 'Pass':
        return 28;
    }
  }
  return (
    (points[sub.level]?.[sub.grade - 1] ?? 0) +
    (sub.special === 'maths' && sub.level === 'H' && sub.grade <= 6 ? 25 : 0)
  );
};

export default function PointsCalculator() {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      subject: 'Mathematics',
      level: 'H',
      grade: 1,
      special: 'maths',
      uuid: uuidV4(),
    },
    { subject: 'English', level: 'H', grade: 1, uuid: uuidV4() },
    { subject: 'Irish', level: 'H', grade: 1, uuid: uuidV4() },
    { subject: '', level: 'H', grade: 1, uuid: uuidV4() },
    { subject: '', level: 'H', grade: 1, uuid: uuidV4() },
    { subject: '', level: 'H', grade: 1, uuid: uuidV4() },
    { subject: '', level: 'H', grade: 1, uuid: uuidV4() },
    {
      subject: 'LCVP',
      grade: 'None',
      uuid: uuidV4(),
      special: 'LCVP',
    },
  ]);

  const [animationParent] = useAutoAnimate();

  // Create array of grade colours
  const colours = [
    'bg-emerald-400', // H1
    'bg-green-500',
    'bg-lime-500',
    'bg-yellow-500',
    'bg-amber-500', // H5, O1
    'bg-orange-500',
    'bg-red-500',
    'bg-rose-500',
    'bg-pink-500',
    'bg-fuchsia-500',
    'bg-purple-500',
    'bg-violet-500', // O8
  ];

  // Track analytics if available
  useEffect(() => {
    if (typeof window !== 'undefined' && window.splitbee) {
      window.splitbee.track('Points Calculator Viewed');
    }
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden">
      <div className="bg-purple-600 text-white text-center py-4 px-6">
        <h2 className="text-2xl font-bold">Leaving Cert Points Calculator</h2>
      </div>
      
      <div className="p-6">
        <Link 
          href="/exams" 
          className="text-purple-600 hover:text-purple-800 mb-4 inline-block dark:text-purple-400 dark:hover:text-purple-300"
        >
          Past Papers
        </Link>
        
        <table className="w-full mt-4 border-collapse">
          <thead className="bg-gray-100 dark:bg-zinc-800">
            <tr>
              <th className="p-2 text-left">No.</th>
              <th className="p-2 text-left">Subject</th>
              <th className="p-2 text-left">Level</th>
              <th className="p-2 text-left">Grade</th>
              <th className="p-2 text-right">Points</th>
            </tr>
          </thead>
          <tbody ref={animationParent}>
            {subjects.map((subject, index) => (
              <tr 
                key={subject.uuid} 
                className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-zinc-800/70' : 'dark:bg-zinc-800'} ${
                  subject.disabled ? 'opacity-70' : ''
                }`}
              >
                <td
                  className={`p-2 cursor-pointer ${
                    subject.special === 'LCVP'
                      ? 'bg-zinc-700'
                      : colours[subject.level === 'O' ? subject.grade + 3 : subject.grade - 1]
                  }`}
                  onClick={() =>
                    setSubjects(
                      subjects
                        .map((s, i) =>
                          i === index
                            ? { ...subject, disabled: !(s.disabled || false) }
                            : s
                        )
                        .sort((a, b) => calcPoints(b) - calcPoints(a))
                    )
                  }
                >
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-white/20 text-white text-xs">
                    {index + 1}
                  </span>
                </td>
                <td className="p-2">
                  {subject.special === 'LCVP' ? (
                    <a 
                      href="https://www.citizensinformation.ie/en/education/state-examinations/leaving-certificate-vocational-programme/" 
                      target="_blank"
                      rel="noreferrer" 
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      LCVP
                    </a>
                  ) : (
                    <input
                      className="w-full min-w-0 bg-transparent border-none focus:ring-2 focus:ring-purple-500 rounded-md"
                      placeholder="Subject..."
                      value={subject.subject}
                      disabled={!!subject.special}
                      onChange={(e) =>
                        setSubjects(
                          subjects.map((s, i) =>
                            i === index
                              ? { ...subject, subject: e.target.value }
                              : s
                          )
                        )
                      }
                    />
                  )}
                </td>
                <td className="p-2 text-center">
                  {subject.special !== 'LCVP' ? (
                    <select
                      className="bg-transparent border border-gray-300 rounded-md p-1"
                      value={subject.level}
                      onChange={(e) =>
                        setSubjects(
                          subjects
                            .map((s, i) =>
                              i === index
                                ? {
                                    ...subject,
                                    level: e.target.value as 'H' | 'O',
                                  }
                                : s
                            )
                            .sort((a, b) => calcPoints(b) - calcPoints(a))
                        )
                      }
                    >
                      {['H', 'O'].map((item) => (
                        <option
                          key={item}
                          value={item}
                          className="bg-white dark:bg-zinc-700"
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="p-2 text-center">
                  <select
                    className="bg-transparent border border-gray-300 rounded-md p-1"
                    value={subject.grade}
                    onChange={(e) =>
                      setSubjects(
                        subjects
                          .map((s, i) =>
                            i === index
                              ? subject.special === 'LCVP'
                                ? {
                                    ...subject,
                                    grade: e.target
                                      .value as (typeof LCVP_GRADES)[number],
                                  }
                                : {
                                    ...subject,
                                    grade: Number(
                                      e.target.value
                                    ) as (typeof GRADES)[number],
                                  }
                              : s
                          )
                          .sort((a, b) => calcPoints(b) - calcPoints(a))
                      )
                    }
                  >
                    {subject.special === 'LCVP' ? (
                      LCVP_GRADES.map((value) => (
                        <option key={value} value={value} className="bg-white dark:bg-zinc-700">
                          {value}
                        </option>
                      ))
                    ) : (
                      GRADES.map((value) => (
                        <option key={value} value={value} className="bg-white dark:bg-zinc-700">
                          {subject.level}{value} ({calcPoints({...subject, grade: value})})
                        </option>
                      ))
                    )}
                  </select>
                </td>
                <td className="p-2 text-right font-bold">{calcPoints(subject)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-orange-500 text-white">
              <td colSpan={4} className="p-3 text-right font-bold">Total:</td>
              <td className="p-3 text-right font-bold">
                {subjects
                  .sort((a, b) => calcPoints(b) - calcPoints(a))
                  .slice(0, 6)
                  .reduce((acc, sub) => acc + calcPoints(sub), 0)}
              </td>
            </tr>
          </tfoot>
        </table>
        
        <div className="mt-4 p-3 bg-gray-100 dark:bg-zinc-800 rounded-lg text-sm">
          <p className="mb-2 font-semibold">How points are calculated:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your top 6 subjects are counted</li>
            <li>Higher Level Maths: 25 bonus points for H6 or better</li>
            <li>LCVP: Counts if it's one of your top 6</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 