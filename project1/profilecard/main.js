// <div class="bg-dark d-flex flex-column justify-content-center align-items-center">
//     <div class="d-flex align-items-center col-md-7 col-10 m-1">
//         <div class="d-flex col-12 profile-card">
//             <div class="col-8 py-3">
//                 <h4>Kaiden Herman</h4>
//                 <div class="py-2">
//                     <p>Job :</p>
//                     <p>Software Engineer</p>
//                 </div>
//                 <div class="py-2">
//                     <p>Skill :</p>
//                     <p>C++, C#, Java, PHP, JavaScript, Python</p>
//                 </div>
//                 <div class="py-2">
//                     <p>Country :</p>
//                     <p>United States</p>
//                 </div>
//             </div>
//             <div class="col-4 d-flex justify-content-center align-items-center">
//                 <div>
//                     <img class="avatar" src="https://pbs.twimg.com/profile_images/501759258665299968/3799Ffxy.jpeg">
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>

// 関数名：createEmployeeCard
// 入力：employeeName, job, skills, country, avatarUrl
// 出力：カードが含まれる要素(div)

// 先ほどのコードを関数に書き換えてください。



// 3人のemployeeをユーザーカードとして出力してください。
// 3人のemployeeの情報

// employee1 
// "Kaiden Herman", "Software Engineer", "C++, C#, Java, PHP, JavaScript, Python","United States", "https://pbs.twimg.com/profile_images/501759258665299968/3799Ffxy.jpeg"

// employee2
"Elizabeth Dunn", "Accountant", "Excel, Word, Quickbooks", "England", "https://randomuser.me/api/portraits/women/76.jpg"

// employee3
// "Duan Moreno", "Teacher",  "Working with children, History, Word", "Argentina", "https://randomuser.me/api/portraits/med/men/93.jpg"


function createEmployeeCard (employeeName, job, skills, country, avatarUrl) {
  let innerFlex = document.createElement("div");
  innerFlex.classList.add("d-flex", "align-items-center", "col-md-7", "col-10", "m-1");
  
  let cardDiv = document.createElement("div");
  innerFlex.append(cardDiv);
  cardDiv.classList.add("d-flex", "col-12", "profile-card");

  let leftInfo = document.createElement("div");
  leftInfo.classList.add("col-8", "py-3");

  let div1 = document.createElement("div");
  div1.classList.add("py-2")

  let div2 = div1.cloneNode(true);
  let div3 = div1.cloneNode(true);

  let nameTitle = document.createElement("h4");
  nameTitle.innerHTML = employeeName;

  let employeeJob = document.createElement("p")
  let employeeSkill = document.createElement("p")
  let employeeCountry = document.createElement("p");

  employeeJob.innerHTML = "Job: " + "<br>"  + job;
  div1.append(employeeJob);

  employeeSkill.innerHTML = "Skill: " + "<br>"  + skills;
  div2.append(employeeSkill);

  employeeCountry.innerHTML = "Country : " + "<br>"  + country;
  div3.append(employeeCountry);

  leftInfo.append(nameTitle);
  leftInfo.append(div1);
  leftInfo.append(div2);
  leftInfo.append(div3);

  let rightInfo = document.createElement("div");
  let div4 = document.createElement("div");
  rightInfo.classList.add("col-4", "d-flex", "justify-content-center", "align-items-center");

  let avatar = document.createElement("img");
  avatar.classList.add("avatar");
  avatar.src = avatarUrl;

  div4.append(avatar);
  rightInfo.append(div4);

  cardDiv.append(leftInfo);
  cardDiv.append(rightInfo);

  return innerFlex;

}

let employee1 = createEmployeeCard("Kaiden Herman", "Software Engineer", "C++, C#, Java, PHP, JavaScript, Python","United States", "https://pbs.twimg.com/profile_images/501759258665299968/3799Ffxy.jpeg");

let employee2 = createEmployeeCard("Elizabeth Dunn", "Accountant", "Excel, Word, Quickbooks", "England", "https://randomuser.me/api/portraits/women/76.jpg");

let employee3 = createEmployeeCard("Duan Moreno", "Teacher",  "Working with children, History, Word", "Argentina", "https://randomuser.me/api/portraits/med/men/93.jpg");

let profiles = document.getElementById("profiles")
profiles.append(employee1);
profiles.append(employee2);
profiles.append(employee3);