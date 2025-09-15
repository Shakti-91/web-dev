
async function signup(){
    const username=document.querySelector("#user").value;
    const password=document.querySelector("#pass").value;
    if(!username || !password)alert(" please enter something");
    else {
        const response= await axios.post("http://localhost:3000/me",{
           username,
           password
        })
    }
    alert("you are signed in");
}