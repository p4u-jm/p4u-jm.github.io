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
    
    if (selected_tag.trim() !== "") {
        var title = ""
        
        title_tag = selected_tag

        var header = ""

        pledges.forEach( pledge => {
            if ( pledge.category === selected_tag ) {
                header = pledge.header
            }
        })

        title = `&#8220;${header} ${Josa.r(title_tag, '을/를')} 위한 약속&#8221;` 
        document.getElementById("pledges_message").innerHTML = title
    }

}

const renderBody = (selected_tag) => {
    var element_html = ""

    filterPledges(selected_tag).forEach(pledge => {

        var element_child = ""
        element_child = `<div class="pledge">`

        let website_url = ( pledge.website_url.trim() !== "") ? pledge.website_url : "#"

        element_child = element_child + `
            <div class="pledge_title">
                <a href="${pledge.website_url}" target="_blank" rel="noopener noreferrer">
                    ${pledge.title}
                </a>
            </div>
            <div class="pledge_description">
                ${pledge.description}
            </div>
            `

        element_child = element_child + `<div class="links">`

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
