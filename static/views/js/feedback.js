const feedbackForm = document.getElementById('feedback-form')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const subjectInput = document.getElementById('subject')
const commentInput = document.getElementById('comment')

feedbackForm.addEventListener('submit', (event) => {
    const info = {
        name: nameInput.value,
        email: emailInput.value,
        subject: subjectInput.value,
        comment: commentInput.value
    }
    event.preventDefault()
    emailjs.send('service_35xlvu9', 'template_59xb3py', info, 'm_NLd4Ivpm-aCOYbB')
        .then((res) => {
            if (res.status === 200) {
                alert(`Feedback sent successfully!\nThanks for helping to improve this website ${nameInput.value} :)`)
            } else {
                alert(`Something went wrong :(\nAn error ocurred while sending your email`)
            }
            nameInput.value = '';
            emailInput.value = '';
            subjectInput.value = '';
            commentInput.value = '';
        })
})