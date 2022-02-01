
document.addEventListener('DOMContentLoaded', () => {
    fetchData.then((successMessage) => {
        console.log(successMessage)
        render("")
    })
}, false)
