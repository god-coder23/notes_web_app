import React from 'react'
import { Plus } from 'lucide-react';
import { File } from 'lucide-react';
import "@fontsource/inter";
import { useEffect } from 'react';
const App = () => {
  const [title, setTitle] = React.useState("");
  const [detailed, setDetailed] = React.useState("");
  const [task, setTask] = React.useState(()=>{
    const notes = localStorage.getItem("notes")
    return notes ? JSON.parse(notes):[]
  });
  const submitHandler=(e)=>{
    e.preventDefault()
    const copyTask = [...task]
    copyTask.push({title,detailed,date,day})
    setTask(copyTask)
    setTitle("")
    setDetailed("")
  }
  React.useEffect(()=>{
    localStorage.setItem("notes",JSON.stringify(task))
  },[task])
  const [date, setDate] = React.useState("");
  const [day, setDay] = React.useState("");
  React.useEffect(()=>{
    const getTime_date = async()=>{
      try {
        const res = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata")
        const data = await res.json()
        setDay(data.dayOfWeek)
        setDate(data.date)
      }
      catch(err){
        console.log("API fetch failed");
        setDate("1/1/1999")
        
      }
    }
    getTime_date()

  },[])
 const deleteNote = (idx) => {
    const copyTask = [...task];
    copyTask.splice(idx, 1);
    setTask(copyTask);
};
  
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#1a0f2e] to-black text-white p-10 lg:flex">
      
      <form onSubmit={submitHandler} 
      className="flex lg:w-1/2 flex-col p-0 gap-4 items-start">
        <div className="bg-[#0f0f0f] border border-[#242426] w-14/15 rounded-2xl p-12 h-full">
          <h1 className="text-3xl flex items-center gap-2 font-bold"><div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-2xl shadow-purple-500/20">
            <File size={25} color="#ffffff" bg-black strokeWidth={3} absoluteStrokeWidth />
            </div>
            New Note</h1>
          <h1 className="mt-6 mb-1 text-sm text-gray-400 tracking-wide font-medium">TITLE</h1>
          <input
         type="text" 
         placeholder="e.g. Project Idea..."
         className="px-5 placeholder:text-[#2d2c2d] border-2 bg-[#0f0e0e] border-[#242426] w-full py-2 font-medium rounded-2xl h-[60px] outline-none"
         value={title}
         onChange={(e)=>{
          setTitle(e.target.value)
         }} />
         <h1 className="mt-6 text-sm text-gray-400 tracking-wide font-medium">DETAILS</h1>
        <textarea 
        className="px-5 placeholder:text-[#2d2c2d] mt-1 w-full py-2 h-[340px] font-medium border-2 bg-[#0f0e0e] border-[#242426] rounded-2xl outline-none" 
        placeholder="What's on your mind?"
        value={detailed}
        onChange={(e)=>{
          setDetailed(e.target.value)
        }}
        />
        <button type="submit" className="group flex items-center justify-center font-bold hover:bg-gray-100 text-black bg-white active:scale-95 w-full h-16 font-medium gap-2 px-5 py-2 rounded-2xl outline-none text-2xl transition">
          <div className="transition-transform duration-300 group-hover:rotate-180">
            <Plus size={25} color="black" strokeWidth={2} />
          </div>
          Create Note</button>
        </div>
      </form>
      <div className="w-full p-10 bg-[#0f0f0f] h-full rounded-3xl border border-[#242426] flex flex-col">
        <h1 className="text-4xl font-bold border-b-2 py-3 border-[#242426]">Recent Notes</h1>
        <div className="flex flex-wrap gap-5 mt-5 overflow-y-auto flex-1">
          {task.map((elem,idx)=>{
            return <div key={idx} className="relative flex justify-between flex-col items-start h-[260px] w-[360px] pt-9 pb-4 px-4 rounded-2xl bg-gradient-to-br from-[#111118] to-[#0a0a0f]  overflow-auto">
              <h2 className="text-[#626263] absolute top-4 right-4 text-sm">{elem.date}</h2>
              <h2 className="text-[#626263] absolute top-4 left-4 text-sm">{elem.day}</h2>
              <div className="text-white">
                <h3 className="leading-9 text-xl text-white font-bold">{elem.title}</h3>
                <p className="mt-3 leading-tight font-medium text-gray-600 ">{elem.detailed}</p>
              </div>
              <button onClick={()=>{
                deleteNote(idx)
              }} className="w-full h-8 cursor-pointer active:scale-95 py-1 text-xs rounded font-bold bg-red-500 text-white">Delete</button>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default App
