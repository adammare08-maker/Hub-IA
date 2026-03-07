fetch("https://hub-ia.[ton-compte].workers.dev", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ message: "Bonjour Worker !" })
})
.then(res => res.json())
.then(data => console.log(data));
