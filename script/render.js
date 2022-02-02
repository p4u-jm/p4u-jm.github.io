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
    tags = Array.from(tags).sort()
    
    document.getElementById("tags").innerHTML = renderTags(tags, selected_tag)
    document.getElementById("pledges_gotop_tags").innerHTML = renderTagsStatic(tags)
}

const renderTags = (tags, selected_tag) => {
    var element_html = ""

    tags.forEach( tag => {
        var element_child = ""
        let css_class = ( tag === selected_tag ) ? "tag_selected" : "tag"
        
        element_child = `<button class="${css_class}" onclick="selectTag('${tag}')">${tag}</button>`
        element_html = element_html + element_child
    })
    
    return element_html
}

const renderTagsStatic = (tags) => {
    var element_html = ""

    tags.forEach( tag => {
        var element_child = ""
        element_child = `<span>#${tag}</button> `
        element_html = element_html + element_child
    })
    
    return element_html
}

const renderTitle = (selected_tag) => {
    
    var title = ""
    
    if (selected_tag.trim() === "") {
        title = `&#8220;나의 <span>[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</span>를 위한 약속&#8221;` 
    } else {
        var header = "나의"
        let title_tag = selected_tag

        pledges.forEach( pledge => {
            if ( pledge.category === selected_tag ) {
                header = pledge.header
            }
        })

        title = `&#8220;${header} <span>${title_tag}</span>${Josa.c(title_tag, '을/를')} 위한 약속&#8221;` 
    }

    document.getElementById("pledges_message").innerHTML = title
    

}

const renderBody = (selected_tag) => {
    var element_html = ""
    var index_element = 0

    filterPledges(selected_tag).forEach(pledge => {

        var element_child = ""
        element_child = `<div class="pledge" id="pledge_${index_element}">`

        let website_url = ( pledge.website_url.trim() !== "") ? pledge.website_url : "#"

        element_child = element_child + `
            <div onclick="expandPledge(${index_element})">
                <div class="pledge_location">    
                    ${pledge.location}
                </div>
                <div class="pledge_title">    
                    ${pledge.title}
                </div>
                <div class="pledge_description">
                    ${pledge.description}
                </div>
            </div>
            <div class="pledge_more" id="more_${index_element}" onclick="expandPledge(${index_element})">
                <img src="./img/plus.png" alt="아래로 화살표" />
            </div>
            `

        element_child = element_child + `<div class="links" id="link_${index_element}" >`

        if ( pledge.website_url.trim() !== "") {

            element_child = element_child + `
                <div class="link_website">
                    <a href="${pledge.website_url}" target="_blank" rel="noopener noreferrer">
                        내용 더 보기
                        <img src="./img/outlink.png" />
                    </a>
                </div>
                `
        }

        if ( pledge.image_name.trim() !== "") {

            let youtube_url_array  = pledge.youtube_url.split('/')
            let youtube_key = youtube_url_array.pop()

            element_child = element_child + `
                <div>
                    <img src="${pledge.image_name}" />
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


        element_child = element_child + `
                <div class="pledge_fold" onclick="foldPledge(${index_element})">
                    <img src="./img/arrow_up.png" alt="접기 화살표" />
                    접기
                </div>
            </div>
            `
        element_child = element_child + `</div>`

        element_html = element_html + element_child

        index_element++
    })

    document.getElementById("pledges").innerHTML = element_html
}

const selectTag = (tag) => {
    element = document.getElementById('pledges_message')
    scrollToElement(element)
    render(tag)
}

const moveToTop = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    render(tag)
}

const expandPledge = (index) => {
    var element = document.getElementById("link_" + index)

    var index_temp  = 0

    while(element) {
        element = document.getElementById("link_" + index_temp)
        
        if (element) {
            element.style.display = "none"
        }
        
        element = document.getElementById("more_" + index_temp)
        
        if (element) {
            element.style.display = "block"
        }
        
        index_temp++
    }

    element = document.getElementById("link_" + index)
    element.style.display = "block"

    element = document.getElementById("more_" + index)
    element.style.display = "none"

    element = document.getElementById('pledge_' + index)
    scrollToElement(element)
}

const foldPledge = (index) => {
    var element = document.getElementById("link_" + index)
    
    if (element) {
        element.style.display = "none"
        console.log(element)
    }
    
    element = document.getElementById("more_" + index)
    
    if (element) {
        element.style.display = "block"
        console.log(element)
    }

    element = document.getElementById('pledge_' + index)
    scrollToElement(element)
}

const reloadPage = () => {
    location.href = "./index.html"
}

const scrollToElement = (element) => {
    let top = element.offsetTop
    window.scrollTo({top: top, left: 0, behavior: 'smooth'})
}