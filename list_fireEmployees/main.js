
/*
function fireEmployees(employees,unemployed){
  //ここから書きましょう
  for(let i = 0; i < unemployed.length; i++){
      let pos = employees.indexOf(unemployed[i]);
      while(pos != -1){
        employees.splice(pos, 1);
        pos = employees.indexOf(unemployed[i], pos + 1);
 
      }
  }
  return employees;

}
*/
function fireEmployees(employees,unemployed){
  const HashMap = {};
  const ArrayList = {};

  for(let i = 0; i < unemployed.length; i++){
    HashMap[unemployed[i]] = unemployed[i];
  }
  for(let i = 0; i < employees.length; i++){
    if(!(employees[i] in HashMap)){
      ArrayList[employees[i]] = employees[i];
    }
  }
  let resultArr = Object.keys(ArrayList);

  return resultArr;
}


console.log(fireEmployees(["Steve","David","Mike","Donald","Lake","Julian"],["Donald","Lake"]));