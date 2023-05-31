const APIURL = "https://api.github.com/users/";
// const MostView="https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc"
 const MostView="https://api.github.com/search/repositories?q=stars:%3E1&sort=stars"
async function getUser(u){
    const resp= await fetch(APIURL+u);
    const respdata= await resp.json();
    console.log(respdata)

    return respdata;
}
const username="GURPARTAP001"

getUser(username);

async function mostviewed(){
    const resp= await fetch(MostView);
    const respdata= await resp.json();
    console.log(respdata)
    console.log(respdata.items[0].owner.login)
    return respdata;
}

mostviewed();