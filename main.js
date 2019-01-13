let data

const getIndex = async () => {
    const response = await fetch('./examIndex.json')
    const json = await response.json()
    
    console.log(json)
    data = json
    displaySubjectOptions(json.subjects)
}

const displaySubjectOptions = (subjects) => {
    const subjectSelection = document.getElementById('subjectSelection')
    
    let optionsHTML = ''
    for(subject of subjects){
        const subjectName = Object.keys(subject)[0]
        optionsHTML = optionsHTML + `
            <option value=${subjectName}>
                ${subjectName}
            </option>
        `
    }  

    subjectSelection.innerHTML = optionsHTML
}

const selectSubject = () => {
    displayExams(document.getElementById("subjectSelection").value)
}

const displayExams = (selectedSubject) => {
    const examList = document.getElementById('availableExams')
    const vwo = document.getElementById('VWO').checked
    const havo = document.getElementById('HAVO').checked

    const options = data.subjects.find(subject => {
        console.log(subject)
        return Object.keys(subject)[0] === selectedSubject
    })[selectedSubject]
    .filter(exam => {
        return (vwo && exam.includes("VW")) || (havo && exam.includes("HA"))
    })

    console.log(vwo, havo)

    let optionsHTML = ''
    for(option of options){
        optionsHTML = optionsHTML + `
            <li onclick=displayDocument('examens/${selectedSubject}/${option}')>
                ${option}
            </li>
        `
    }

    examList.innerHTML = optionsHTML
}

const displayDocument = (fileName) => {
    document.getElementById('pdfViewer').data = fileName
}

getIndex()