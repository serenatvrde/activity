// console.log(firebase);

// ----------------------------
// TEAM DATA
// ----------------------------
let teams = [
  {
    teamName: "Real Madrid",
    city: "Madrid",
    country: "Spain",
    topScorers: ["Ronaldo", "Benzema", "Hazard"],
    fans: 798,
    type: "club",
  },
  {
    teamName: "Barcelona",
    city: "Barcelona",
    country: "Spain",
    topScorers: ["Messi", "Suarez", "Puyol"],
    fans: 738,
    type: "club",
  },
  {
    teamName: "Manchester United",
    city: "Manchester",
    country: "England",
    topScorers: ["Cantona", "Rooney", "Ronaldo"],
    fans: 755,
    type: "club",
  },
  {
    teamName: "Manchester City",
    city: "Manchester",
    country: "England",
    topScorers: ["Sterling", "Aguero", "Haaland"],
    fans: 537,
    type: "club",
  },
  {
    teamName: "Brazil National Team",
    city: "Not applicable",
    country: "Brazil",
    topScorers: ["Ronaldinho", "Cafu", "Bebeto"],
    fans: 950,
    type: "national",
  },
  {
    teamName: "Argentina national team",
    city: "Not applicable",
    country: "Argentina",
    topScorers: ["Messi", "Batistuta", "Maradona"],
    fans: 888,
    type: "national",
  },
  {
    teamName: "Atletico Madrid",
    city: "Madrid",
    country: "Spain",
    topScorers: ["Aragonés", "Griezmann", "Torez"],
    fans: 400,
    type: "club",
  },
];

// ----------------------------
// ADD TEAMS TO DATABASE
// ----------------------------
document.querySelector("#add_teams").addEventListener("click", () => {
  teams.forEach((team) => {
    db.collection("teams")
      .add(team)
      .then(() => {
        console.log(team.teamName + " added");
      });
  });

  alert("Teams added! Click 'Show All Teams' in a few seconds.");
});

// ----------------------------
// SHOW ALL TEAMS
// ----------------------------
document.querySelector("#show_all").addEventListener("click", () => {
  show_teams();
});

function show_teams() {
  db.collection("teams")
    .get()
    .then((mydata) => {
      let docs = mydata.docs;

      let html = ``;

      docs.forEach((d) => {
        let data = d.data();

        html += `
            <div class="box">
              <p><strong>Team:</strong> ${data.teamName}</p>
              <p><strong>City:</strong> ${data.city}</p>
              <p><strong>Country:</strong> ${data.country}</p>
              <p><strong>Type:</strong> ${data.type}</p>
              <p><strong>Top scorers:</strong> ${data.topScorers.join(", ")}</p>
              <p><strong>Fans:</strong> ${data.fans} million</p>
              <p><strong>Doc ID:</strong> ${d.id}</p>
            </div>
          `;
      });

      document.querySelector("#all_teams").innerHTML = html;
    });
}

// ----------------------------
// HELPER FUNCTION FOR QUERIES
// ----------------------------
function show_query_results(title, docs) {
  let html = `<h2 class="subtitle mt-4">${title}</h2>`;

  if (docs.length == 0) {
    html += `<p>No results found.</p>`;
    document.querySelector("#query_results").innerHTML = html;
    return;
  }

  docs.forEach((d) => {
    let data = d.data();

    html += `
        <div class="box">
          <p><strong>Team:</strong> ${data.teamName}</p>
          <p><strong>City:</strong> ${data.city}</p>
          <p><strong>Country:</strong> ${data.country}</p>
          <p><strong>Type:</strong> ${data.type}</p>
          <p><strong>Top scorers:</strong> ${data.topScorers.join(", ")}</p>
          <p><strong>Fans:</strong> ${data.fans} million</p>
        </div>
      `;
  });

  document.querySelector("#query_results").innerHTML = html;
}

// ----------------------------
// QUERY 1: all teams in Spain
// ----------------------------
document.querySelector("#q1").addEventListener("click", () => {
  db.collection("teams")
    .where("country", "==", "Spain")
    .get()
    .then((data) => {
      show_query_results("All teams in Spain", data.docs);
    });
});

// ----------------------------
// QUERY 2: all teams in Madrid, Spain
// ----------------------------
document.querySelector("#q2").addEventListener("click", () => {
  db.collection("teams")
    .where("country", "==", "Spain")
    .where("city", "==", "Madrid")
    .get()
    .then((data) => {
      show_query_results("All teams in Madrid, Spain", data.docs);
    });
});

// ----------------------------
// QUERY 3: all national teams
// ----------------------------
document.querySelector("#q3").addEventListener("click", () => {
  db.collection("teams")
    .where("type", "==", "national")
    .get()
    .then((data) => {
      show_query_results("All national teams", data.docs);
    });
});

// ----------------------------
// QUERY 4: all teams not in Spain
// ----------------------------
document.querySelector("#q4").addEventListener("click", () => {
  db.collection("teams")
    .where("country", "!=", "Spain")
    .get()
    .then((data) => {
      show_query_results("All teams not in Spain", data.docs);
    });
});

// ----------------------------
// QUERY 5: all teams not in Spain or England
// ----------------------------
document.querySelector("#q5").addEventListener("click", () => {
  db.collection("teams")
    .where("country", "not-in", ["Spain", "England"])
    .get()
    .then((data) => {
      show_query_results("All teams not in Spain or England", data.docs);
    });
});

// ----------------------------
// QUERY 6: teams in Spain with more than 700M fans
// ----------------------------
document.querySelector("#q6").addEventListener("click", () => {
  db.collection("teams")
    .where("country", "==", "Spain")
    .where("fans", ">", 700)
    .get()
    .then((data) => {
      show_query_results(
        "All teams in Spain with more than 700M fans",
        data.docs
      );
    });
});

// ----------------------------
// QUERY 7: teams with fans between 500M and 600M
// ----------------------------
document.querySelector("#q7").addEventListener("click", () => {
  db.collection("teams")
    .where("fans", ">=", 500)
    .where("fans", "<=", 600)
    .get()
    .then((data) => {
      show_query_results(
        "All teams with fans between 500M and 600M",
        data.docs
      );
    });
});

// ----------------------------
// QUERY 8: teams where Ronaldo is a top scorer
// ----------------------------
document.querySelector("#q8").addEventListener("click", () => {
  db.collection("teams")
    .where("topScorers", "array-contains", "Ronaldo")
    .get()
    .then((data) => {
      show_query_results("All teams where Ronaldo is a top scorer", data.docs);
    });
});

// ----------------------------
// QUERY 9: teams where Ronaldo, Maradona, or Messi is a top scorer
// ----------------------------
document.querySelector("#q9").addEventListener("click", () => {
  db.collection("teams")
    .where("topScorers", "array-contains-any", ["Ronaldo", "Maradona", "Messi"])
    .get()
    .then((data) => {
      show_query_results(
        "All teams where Ronaldo, Maradona, or Messi is a top scorer",
        data.docs
      );
    });
});

// ----------------------------
// RUN ALL REQUIRED UPDATES
// ----------------------------
document.querySelector("#update_data").addEventListener("click", () => {
  update_real_madrid();
  update_barcelona();

  alert(
    "Update commands were sent. Check Firestore and then click Show All Teams."
  );
});

// ----------------------------
// UPDATE REAL MADRID
// ----------------------------
function update_real_madrid() {
  db.collection("teams")
    .where("teamName", "==", "Real Madrid")
    .get()
    .then((data) => {
      data.docs.forEach((d) => {
        db.collection("teams").doc(d.id).update({
          teamName: "Real Madrid FC",
          fans: 811,
        });

        db.collection("teams")
          .doc(d.id)
          .update({
            topScorers: firebase.firestore.FieldValue.arrayRemove("Hazard"),
          });

        db.collection("teams")
          .doc(d.id)
          .update({
            topScorers: firebase.firestore.FieldValue.arrayUnion("Crispo"),
          });

        db.collection("teams")
          .doc(d.id)
          .update({
            color: {
              home: "White",
              away: "Black",
            },
          });

        db.collection("teams").doc(d.id).update({
          "color.away": "Purple",
        });
      });
    });
}

// ----------------------------
// UPDATE BARCELONA
// ----------------------------
function update_barcelona() {
  db.collection("teams")
    .where("teamName", "==", "Barcelona")
    .get()
    .then((data) => {
      data.docs.forEach((d) => {
        db.collection("teams").doc(d.id).update({
          teamName: "FC Barcelona",
          fans: 747,
        });

        db.collection("teams")
          .doc(d.id)
          .update({
            topScorers: firebase.firestore.FieldValue.arrayRemove("Puyol"),
          });

        db.collection("teams")
          .doc(d.id)
          .update({
            topScorers: firebase.firestore.FieldValue.arrayUnion("Deco"),
          });

        db.collection("teams")
          .doc(d.id)
          .update({
            color: {
              home: "Red",
              away: "Gold",
            },
          });

        db.collection("teams").doc(d.id).update({
          "color.away": "Pink",
        });
      });
    });
}

// comment out things if you do not want them to keep running automatically
