class Pledge {  
    constructor(
        header,
        category,
        title,	
        description,	
        website_url,
        image_name,	
        youtube_url	) {
            this.header = header	
            this.category = category	
            this.title = title
            this.description = description	
            this.website_url = website_url
            this.image_name = image_name	
            this.youtube_url = youtube_url				
    }
}

const fetchData = new Promise((resolve, reject) => {
    const url = "./data/pledges.csv"

    fetch(url, { mode: 'cors' })
    .then((response) => {                
        if (response.status !== 200) {
            console.log('Status Code: ' + response.status + ' while fetching ' + this.seaDataPath) 
            return 
        }
        return response.text() 
    })
    .then((csv) => {                
        if (csv !== null) {            
            var index = 0
            parseCSV(csv).forEach(item => {
                if ( index > 0 ) {
                    const pledge = new Pledge(
                        item[0].replace('\"', '').replace('\"', '').trim(),  
                        item[1].replace('\"', '').replace('\"', '').trim(), 
                        item[2].replace('\"', '').replace('\"', '').trim(),  
                        item[3].replace('\"', '').replace('\"', '').trim(), 
                        item[4].replace('\"', '').replace('\"', '').trim(),
                        item[5].replace('\"', '').replace('\"', '').trim(),
                        item[6].replace('\"', '').replace('\"', '').trim()
                    )

                    pledges.push(pledge)
                }
                index++
            })
        }
        resolve("CSV file loading was successful.")
        return 
    })
    .catch(function(err) {
        reject('Fetch Error: ' + err) 
        return 
    }) 
})