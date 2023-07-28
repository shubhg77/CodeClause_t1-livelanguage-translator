const fromtext = document.querySelector(".form-text"),
totext = document.querySelector(".to-text"),
selectag = document.querySelectorAll("select"),
exchangeiconwala = document.querySelector('.exchange')
translatebtn= document.querySelector("button"),
iconwla =  document.querySelectorAll(".row i");

selectag.forEach((tag , id) => {
    
    for (const country_lang in countries) {
            // console.log(countries[country_lang]);
            // here select english language by default and hindi also
            let selected ;
            if(id == 0 && country_lang == "en-GB"){
                selected = "selected";
            }
            else if(id == 1 && country_lang == "hi-IN"){
                selected = "selected";
            }
            let option =`<option value="${country_lang}"${selected}>${countries[country_lang]}</option>`;
            tag.insertAdjacentHTML("beforeend",option);//adding option tag in side select tag
    }
});
exchangeiconwala.addEventListener("click" ,()=>{
    //exchange button se lang and text swap krna
let temptxt = fromtext.value,
templang = selectag[0].value;
fromtext.value = totext.value;
selectag[0].value = selectag[1].value;
totext.value = temptxt;
selectag[1].value = templang;
});
translatebtn.addEventListener("click", () =>{
    let text = fromtext.value,
    translatefrom = selectag[0].value,//lena fromselect tag ki value ko
    translateto = selectag[1].value;//lena toselect tag value ko;
    // console.log(text, translatefrom,translateto);
    if(!text) return ;
    totext.setAttribute("placeholder","Translating");
    // here fetching api with response and returning it with data 
    let Apiurl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translatefrom}|${translateto}`;
    fetch(Apiurl).then(res => res.json()).then(data =>{
        // console.log(data);
        totext.value = data.responseData.translatedText;
        totext.setAttribute("placeholder","Translation");
    });
});
// yha clicked icon h from id ,copy ka fromtextarea se value lena verna copy the text value
iconwla.forEach (icon =>{
    icon.addEventListener ("click", ({target})=>{
        // console.log (target)
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                // console.log("from copy icon clicked");
                navigator.clipboard.writeText(fromtext.value);
            }
            else{
                // console.log("to copy icon clicked");
                navigator.clipboard.writeText(totext.value);
            }
        }
        else{
            let result ;
            if(target.id === "from"){
                result =new SpeechSynthesisUtterance(fromtext.value);
                result.lang = selectag[0].value;//from textArea ki value speak krane k liye
            }
            else{
                result =new SpeechSynthesisUtterance(totext.value);
                result.lang = selectag[1].value;//from textArea ki value speak krane k liye
            }
            speechSynthesis.speak(result);
        }
    });
})