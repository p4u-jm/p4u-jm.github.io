
document.addEventListener('DOMContentLoaded', () => {
    fetchData.then((successMessage) => {
        console.log(successMessage)
        console.log(pledges)
        render("")
    })
}, false)
