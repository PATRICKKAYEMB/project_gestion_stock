import React from 'react'
import {motion} from "framer-motion"
import { PieChart,Pie,Cell,ResponsiveContainer,Legend, Tooltip } from "recharts"

const CategoryData=[
    {name:"Electronics",value:4500},
    {name:"Clothing",value:3200},
    {name:"Home & garden",value:2800},
    {name:"Books",value:2100},
    {name:"Sport & Outdoors",value:1900},
]
const CategorieChart = () => {
    const COLORS=["#6366f1","#885CF1","#EC4899","#108981"]
  return (
    <motion.div
    className="bg-blue-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
         initial={{opacity:0,y:20}}
         animate={{opacity:1,y:0}}
         transition={{delay:0.2}}
    >
     <h2 className="text-lg font-medium nb-4 text-gray-100">Category Distribution</h2>
 
     <div className="h-80">
         <ResponsiveContainer
             width={"100%"}
             height={"100%"}
         >
             <PieChart>
                 <Pie
                     data={CategoryData}
                     cx={"50%"}
                     cy={"50%"}
                     labelLine={false}
                     outerRadius={80}
                     fill="#8884d8"
                     dataKey="value"
                     label={({name,percent})=>`${name} ${(percent * 100).toFixed(0)}%`}
                 >
                     {
                         CategoryData.map((entry,index)=>(
                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                         ))
                     }
 
                 </Pie>
                 <Tooltip 
                      contentStyle={{
                         backgroundColor:"rgba(31, 41, 35, 0.8)",
                         borderColor:"#4B5563",
                     }}
                     itemStyle={{color:"#E5E7EB"}}    
                 />
                 <Legend/>
             </PieChart>
 
         </ResponsiveContainer>
     </div>
    </motion.div>
  )
}

export default CategorieChart