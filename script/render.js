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
    // tags = Array.from(tags).sort()
    tags = Array.from(tags)
    
    document.getElementById("tags").innerHTML = renderTags(tags, selected_tag)
    // document.getElementById("pledges_gotop_tags").innerHTML = renderTagsStatic(tags)
}

const renderTags = (tags, selected_tag) => {
    var element_html = ""

    tags.forEach( tag => {
        var element_child = ""
        var css_class = "tag"

        if ( tag === selected_tag ) {
            css_class = "tag_selected"
        }
        
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
            <div class="pledge_expandable" onclick="expandPledge(${index_element})">
                <div class="pledge_intro">
                    <div class="pledge_text">
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
                </div>
                <div class="pledge_more" id="more_${index_element}" onclick="expandPledge(${index_element})">
                    <img src="./img/plus.png" alt="더 자세한 내용 열어보기" />
                </div>
            </div>
            `

        element_child = element_child + `<div class="links" id="link_${index_element}" >`

        if ( pledge.image_name.trim() !== "") {

            let youtube_url_array  = pledge.youtube_url.split('/')
            let youtube_key = youtube_url_array.pop()

            element_child = element_child + `
                <div>
                    <img src="${pledge.image_name}" alt="${pledge.title} 설명 그림" />
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

        if ( pledge.website_url.trim() !== "") {

            element_child = element_child + `
                <div class="link_website">
                    <a href="${pledge.website_url}" target="_blank" rel="noopener noreferrer">
                        내용 더 보기
                        <img src="./img/outlink.png" alt="내용 더 보기 링크 열기" />
                    </a>
                </div>
                `
        }

        element_child = element_child + `
                <div class="pledge_fold" onclick="foldPledge(${index_element})">
                    <img src="./img/arrow_up.png" alt="공약 내용 간단히 보도록 접기" />
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

    // console.log("selected category: " + tag)
    gtag('event', '카테고리 선택', {
        'event_category': '카테고리',
        'event_lavel': `${tag}`
    })
    gtag('event', `카테고리: ${tag}`, {
        'event_category': '카테고리',
        'event_lavel': `${tag}`
    })
}

const moveToTop = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    // render(tag)
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

    element_title = element.getElementsByClassName('pledge_title')[0]
    element_location = element.getElementsByClassName('pledge_location')[0]

    if (element_title || element_location) {
        let title = element_title.innerText
        let location = element_location.innerText
        
        // console.log("selected pledge: " + title + location)
    
        gtag('event', '세부공약 선택', {
            'event_category': '세부공약',
            'event_lavel': `${title} ${location}`
        })
        gtag('event', `세부공약: ${title} ${location}`, {
            'event_category': '세부공약',
            'event_lavel': `${title} ${location}`
        })

        // console.log(`세부공약: ${title} ${location}`)
    }
}

const foldPledge = (index) => {
    var element = document.getElementById("link_" + index)
    
    if (element) {
        element.style.display = "none"
        // console.log(element)
    }
    
    element = document.getElementById("more_" + index)
    
    if (element) {
        element.style.display = "block"
        // console.log(element)
    }

    element = document.getElementById('pledge_' + index)
    scrollToElement(element)
}

const scrollToElement = (element) => {
    if (window.safari !== undefined) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        let top = element.offsetTop
        window.scrollTo({top: top, left: 0, behavior: 'smooth'})
    }
}

const selectSection = (section) => {
    var element_0 = document.getElementById("section_0")
    var element_1 = document.getElementById("section_1")
    var element_message = document.getElementById("gotop_message")

    switch (section) {
        case 0:
            element_0.setAttribute("class", "section_selected")
            element_1.setAttribute("class", "section_normal")
            
            fetchData("./data/pledges_interest.csv").then((successMessage) => {
                render("")
            })

            gtag('event', '섹션전환', {
                'event_category': '섹션',
                'event_lavel': `관심분야`
            })
            gtag('event', '섹션전환: 관심분야', {
                'event_category': '섹션',
                'event_lavel': `관심분야`
            })
            
            break
        case 1:
            element_0.setAttribute("class", "section_normal")
            element_1.setAttribute("class", "section_selected")
            element_message.innerText = "우리지역을 선택하세요"
            
            fetchData("./data/pledges_region.csv").then((successMessage) => {
                render("")
            })

            gtag('event', '섹션전환', {
                'event_category': '섹션',
                'event_lavel': `우리지역`
            })
            gtag('event', '섹션전환: 우리지역', {
                'event_category': '섹션',
                'event_lavel': `우리지역`
            })

            break
        default:
            break
    }
}