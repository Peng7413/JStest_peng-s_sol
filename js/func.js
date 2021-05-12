const factories = [
    { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
    { name: "BR2", employees: ["Jessie", "Karen", "John"] },
    { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
    { name: "BR4", employees: [] }
  ];

const employeeType = [
    {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
    {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
    {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
];
const employees = [
    {id: 1, name: "Alice", type: 2},
    {id: 2, name: "Bob", type: 3},
    {id: 3, name: "John", type: 2},
    {id: 4, name: "Karen", type: 1},
    {id: 5, name: "Miles", type: 3},
    {id: 6, name: "Henry", type: 1}
];

const tasks = [
    {id: 1, title: "task01", duration: 60 },
    {id: 2, title: "task02", duration: 120},
    {id: 3, title: "task03", duration: 180},
    {id: 4, title: "task04", duration: 360},
    {id: 5, title: "task05", duration: 30},
    {id: 6, title: "task06", duration: 220},
    {id: 7, title: "task07", duration: 640},
    {id: 8, title: "task08", duration: 250},
    {id: 9, title: "task09", duration: 119},
    {id: 10, title: "task10", duration: 560},
    {id: 11, title: "task11", duration: 340},
    {id: 12, title: "task12", duration: 45},
    {id: 13, title: "task13", duration: 86},
    {id: 14, title: "task14", duration: 480},
    {id: 15, title: "task15", duration: 900}
];

function Count_Employees_Number_by_Factory(){
    var result=[]
    for (var i=0; i<factories.length; i++) {
        result.push({name:factories[i].name,count:factories[i].employees.length});
    }
    console.log(result);
}

function Count_Factories_Number_by_Employee(){
    var name=[];
    var result=[];
    for (var i=0; i<factories.length; i++) {
        name = Array.from(new Set([...factories[i].employees, ...name]))
    }
    name=name.sort();
    var result=[];
    for (var i=0; i<name.length; i++) {
        result.push({employee:name[i],count:0});
        for(var j=0;j<factories.length;j++){
            if(factories[j].employees.indexOf(name[i])!=-1){
                result[i].count++;
            }
        }
    }
    console.log(result);
}

function  Order_employees_list(){
    var result=[]
    for (var i=0; i<factories.length; i++) {
        factories[i].employees=factories[i].employees.sort();
    }
    console.log(factories);
}

function total_hours_worked(){
    var worktime=[];
    var total=0;
    for(var i=0; i<employeeType.length; i++){
        var t1=employeeType[i].work_end.split(':');
        var t2=employeeType[i].work_begin.split(':');
        var t3=(parseInt(t1[0]))-(parseInt(t2[0]));
        if(t3<0){
            t3+=24;
        }
        worktime.push(t3);
    }
    for (var i=0; i<employees.length; i++) {
        total+=worktime[employees[i].type-1];
    }
    return total;
}
function howManyEmployeeByTime(daytime){
    var worktime=[];
    var nowWorkingEmp=0;
    var daytimeTran=daytime.split(":");
    for(var i=0; i<daytimeTran.length; i++){
        daytimeTran[i]=parseInt(daytimeTran[i]);
    }
    if(daytimeTran[0]===0 && daytimeTran[1]===0 && daytimeTran[2]===0){
        daytimeTran[0]=24;
    }
    if(daytimeTran[1]!=0 || daytimeTran[2]!=0){
        daytimeTran[0]+=1;
    }
    for(var i=0; i<employeeType.length; i++){
        var t1=employeeType[i].work_end.split(':');
        var t2=employeeType[i].work_begin.split(':');
        if(t1[0]==="00"){
            t1[0]="24";
        }
        worktime.push({work_begin:parseInt(t2[0]),work_end:parseInt(t1[0])});
    }
    for(var i=0; i<worktime.length; i++){
        if(worktime[i].work_begin<=daytimeTran[0] && worktime[i].work_end>=daytimeTran[0])
        {
            for(var j=0;j<employees.length;j++){
                if(employees[j].type-1===i){
                    nowWorkingEmp++;
                }
            }
        }
    }
    console.log(nowWorkingEmp);
}
function done_all_tasks(){
    var taskmin=0;
    for(var i=0; i<tasks.length; i++){
        taskmin+=tasks[i].duration;
    }
    console.log(taskmin/total_hours_worked());

}
Count_Employees_Number_by_Factory();
Count_Factories_Number_by_Employee();
Order_employees_list();
console.log(total_hours_worked());
howManyEmployeeByTime("09:00:00");
done_all_tasks();