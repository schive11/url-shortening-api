const submit = document.querySelector('.link-submit');
const url = 'https://api.shrtco.de/v2/shorten?url='
const output = document.querySelector('.output');

submit.addEventListener("click", async () => {
    try{
        var input_value = document.querySelector('.link-input').value;
        var encode = encodeURIComponent(input_value);
        const response = await fetch(`${url}${encode}`);
        const data = await response.json();
        var link = data.result.short_link2;
        var result = `<div class="output-links">
                                    <div class="input-link">
                                        <p>${input_value}</p>
                                    </div>
                                    <div class="copy">
                                    <p href="${link}">${link}</p>
                                    <button class="copy-button">Copy</button>
                                    </div>
                         </div>`;
            
         document.querySelector('.output').insertAdjacentHTML("afterbegin",result);
 
    }catch(error){
        console.error(`Error: ${error.message}`);
    }
})


document.addEventListener('click', function (event) {
    if (!event.target.classList.contains('copy-button')) return;
    
    let short_link = event.target.parentNode.querySelector('.copy > p');
    navigator.clipboard.writeText(short_link.innerHTML);

    event.target.classList.add('copied');
    event.target.textContent = 'Copied!';

    setTimeout(() => {
        event.target.classList.remove('copied')
        event.target.textContent = 'Copy'
    }, 5000)

})