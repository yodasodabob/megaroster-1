$(document).foundation()

const megaroster = {
  students: [],

  init(listSelector) {
    this.studentList = document.querySelector(listSelector)
    this.max = 0
    this.setupEventListeners()  
  },

  setupEventListeners() {
    document
      .querySelector('#new-student')
      .addEventListener('submit', this.addStudent.bind(this))
  },

  removeStudent(ev) {
    const btn = ev.target
    for (let i = 0; i < this.students.length; i++) {
      console.log(this.students[i].id, btn.closest('.student').dataset.id)
      if (this.students[i].id == btn.closest('.student').dataset.id) {
        this.students.splice(i, 1)
        break
      }
    } 
    btn.closest('.student').remove()
  },

promotestudent(ev) {
  const btn = ev.target
  btn.closest('.student').style.backgroundColor = #00ff00
},

  addStudent(ev) {
    ev.preventDefault()
    const f = ev.target
    const student = {
      id: this.max + 1,
      name: f.studentName.value,
    }
    this.students.unshift(student)

    const listItem = this.buildListItem(student)
    this.prependChild(this.studentList, listItem)
    this.max ++
    f.reset()
  },

  prependChild(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  },

  buildListItem(student) {
    const template = document.querySelector('.student.template')
    const li = template.cloneNode(true)
    this.removeClassName(li, 'template')
    li.querySelector('.student-name').textContent = student.name
    li.dataset.id = student.id
    li.querySelector('button.remove').addEventListener('click', this.removeStudent.bind(this))
    li.querySelector('button.promote').addEventListener('click', this.promoteStudent.bind(this))
    return li
  },

  removeClassName(el, className){
    el.className = el.className.replace(className, '').trim()
  }
}
megaroster.init('#studentList')
// for moving items in list clone the thing and insert it before the child above it