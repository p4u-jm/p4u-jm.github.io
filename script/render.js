var pledges = []


const filterPledges = (tag) => {
    if (tag === "") {
        return []
    }

    return pledges.filter(pledge => (pledge.category === tag))
}

const render = (selected_tag) => {
    renderNav(selected_tag)
    renderTitle(selected_tag)
    renderBody(selected_tag)
}

const renderNav = (selected_tag) => {
    var categories = []

    pledges.forEach(pledge => {
        categories.push(pledge.category)
    })
    
    var tags = new Set(categories.filter(category => category !== undefined  &&  category !== ""))
    console.log(tags)
    tags = Array.from(tags).sort()
    console.log(tags)

    document.getElementById("tags").innerHTML = renderTags(tags, selected_tag)
}

const renderTags = (tags, selected_tag) => {
    var element_html = ""

    tags.forEach( tag => {
        var element_child = ""
        let css_class = ( tag === selected_tag ) ? "tag_selected" : "tag"
        // let tag_display = tag.trim() === "" ? "모두" : tag
        element_child = `<button class="${css_class}" onclick="selectTag('${tag}')">${tag}</button>`
        element_html = element_html + element_child
    })
    
    return element_html
}

const renderTitle = (selected_tag) => {
    
    var title = ""
    
    if (selected_tag.trim() === "") {
        title = `&#8220;나의 <span>[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]를</span> 위한 약속&#8221;` 
    } else {
        var header = "나의"
        let title_tag = selected_tag

        pledges.forEach( pledge => {
            if ( pledge.category === selected_tag ) {
                header = pledge.header
            }
        })

        title = `&#8220;${header} <span>${Josa.r(title_tag, '을/를')}</span> 위한 약속&#8221;` 
    }

    document.getElementById("pledges_message").innerHTML = title
    

}

const renderBody = (selected_tag) => {
    var element_html = ""
    var index_element = 0

    filterPledges(selected_tag).forEach(pledge => {

        var element_child = ""
        element_child = `<div class="pledge" onclick="expandPledge(${index_element})">`

        let website_url = ( pledge.website_url.trim() !== "") ? pledge.website_url : "#"

        element_child = element_child + `
            <div class="pledge_title">    
                ${pledge.title}
            </div>
            <div class="pledge_description">
                ${pledge.description}
            </div>
            <div class="pledge_more" id="more_${index_element}">
                <img src="./img/plus.png" alt="아래로 화살표" />
            </div>
            `

        element_child = element_child + `<div class="links" id="link_${index_element}" >`

        if ( pledge.website_url.trim() !== "") {

            element_child = element_child + `
                <div>
                    <a href="${pledge.website_url}" target="_blank" rel="noopener noreferrer">
                        민주당 홈페이지에서 확인하기
                    </a>
                </div>
                `
        }

        if ( pledge.image_name.trim() !== "") {

            let youtube_url_array  = pledge.youtube_url.split('/')
            let youtube_key = youtube_url_array.pop()

            element_child = element_child + `
                <div>
                    <img src="./img/cards/${pledge.image_name}" />
                </div>
                `
        }

        if ( pledge.youtube_url.trim() !== "") {

            let youtube_url_array  = pledge.youtube_url.split('/')
            let youtube_key = youtube_url_array.pop()

            element_child = element_child + `
                <div>
                    <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${youtube_key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                `
        }

        element_child = element_child + `</div>`
        element_child = element_child + `</div>`

        element_html = element_html + element_child

        index_element++
    })

    document.getElementById("pledges").innerHTML = element_html
}

const selectTag = (tag) => {
    let pledges_message = document.getElementById('pledges_message').scrollIntoView({ behavior: 'smooth', block: 'center' });
    render(tag)
}

const moveToTop = () => {
    let pledges_message = document.getElementById('header').scrollIntoView({ behavior: 'smooth', block: 'center' });
    render(tag)
}

const expandPledge = (index) => {
    let element = document.getElementById("link_" + index)
    element.style.display = "block"

    element = document.getElementById("more_" + index)
    element.style.display = "none"
}