// below is the api url to fetch the searched profile
const APIURL = "https://api.github.com/users/";
//below is the api url to fetch the top profiles
const MostViewURL = "https://api.github.com/search/repositories?q=stars:%3E1&sort=stars"

const main = document.getElementById("main");
const search = document.getElementById("search");
const form = document.getElementById("form");
const mainHeading = document.getElementById("mainHeading");
const title = document.getElementById("title");



//....................Below is logic for the top repositories..........................................
async function mostviewed() {
    const resp = await fetch(MostViewURL);
    const respdata = await resp.json();
    // console.log(respdata)
    // console.log(respdata.items[0].owner.login)
    return respdata;
}

// mostviewed();

async function showTop() {
    mainHeading.innerHTML = `Some OF The Top Repositories:-`
    const pro = await mostviewed();
    pro.items.forEach(a => {
        const profile = document.createElement("div");
        profile.classList.add("profile");
        profile.innerHTML = `<div class="left">
        <img src=${a.owner.avatar_url} alt="">
        <div class="repolink"><a href="${a.owner.html_url}" target="blank_" >Repository Link</a></div>
        
    </div>

    <div class="right">
        <h2>${a.name}</h2>
        <p>${a.description}</p>
        <div class="tags">
            <span><i class="uil uil-code-branch">forks:${a.forks}</i></span>
            <span>open isses:${a.open_issues}</span>
            <span><i class="uil uil-star">star:${a.stargazers_count}</i></span>
            <span><i class="uil uil-eye">watch:${a.watchers}</i></span>
        </div>
    </div>`
        main.appendChild(profile);

    });
}

showTop();

title.addEventListener("click", () => {
    main.innerHTML = '';
    showTop();
})

//...................... Below is the logoc for the search ........................................

async function getUser(u) {
    const resp = await fetch(APIURL + u);
    const respdata = await resp.json();
    console.log(respdata)

    getrepos(u);
    return respdata;
}



async function showSearch(a) {



    const pro = await getUser(a);
    if(pro.message==="Not Found"){
        mainHeading.innerHTML = `The Searched Profile Is Invalid`
        main.innerHTML="";
        form.reset();
        return 0;
    }
    else{
    mainHeading.innerHTML = `The Searched Profile`
    main.innerHTML = ``;
    const profile = document.createElement("div");
    profile.classList.add("profile1");
    profile.innerHTML = `<img src="${pro.avatar_url}" alt="">
    <h1>${pro.login}</h1>
    <p>${pro.bio}</p>
    <div class="tags1">
        <span class="stags">Followers:${pro.followers}</span>
        <span class="stags">Following:${pro.following}</span>
        <span class="stags">No. Of Repos:${pro.public_repos}</span>
    </div>
    <a href="${pro.html_url}" target="blank_">Profile Link</a>
    <h2>repo's:-</h2>
    <div id="repos1">
        <span class="stags">dfhdfhdf</span>
        ${pro.repos_url.forEach(a>={


        })}
    </div>`
    main.appendChild(profile);}
}

form.addEventListener("submit", (e) => {

    e.preventDefault();
    const searchValue = search.value;
    if (searchValue) {
        showSearch(searchValue);
        form.reset();
    }
    else {
        form.reset();
        alert("Please Enter Valid User-Name");
    }
})
