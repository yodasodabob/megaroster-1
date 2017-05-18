$(document).foundation()

const megaroster = {
  students: [],

  init(listSelector) {
    this.studentList = document.querySelector(listSelector)
    this.max = 0
    this.setupEventListeners()  
    this.load()
  },

  setupEventListeners() {
    document
      .querySelector('#new-student')
      .addEventListener('submit', this.addStudentViaForm.bind(this))
  },

  save() {
    localStorage.setItem('roster', JSON.stringify(this.students))
  },

  load() {
    const rosterString = localStorage.getItem('roster')
    const rosterArray = JSON.stringify(rosterString)
    rosterArray.map(this.addStudent.bind(this))
  },

  moveElementInArray (array, value, item, positionChange) {
    let oldIndex = value;
    if (oldIndex > -1){
      let newIndex = (oldIndex + positionChange);

      if (newIndex < 0){
        newIndex = 0
      }else if (newIndex >= array.length){
        newIndex = array.length
      }
      let arrayClone = array.slice();
      arrayClone.splice(oldIndex,1);
      arrayClone.splice(newIndex,0,item);

      return arrayClone
    }
    return array
  },

  removeStudent(ev) {
    const btn = ev.target
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].id == btn.closest('.student').dataset.id) {
        this.students.splice(i, 1)
        break
      }
    } 
    btn.closest('.student').remove()
    this.save()
  },

  promoteStudent(ev) {
    const btn = ev.target
    btn.closest('.student').style.backgroundColor = '#00ff00'
  },

  moveUp(ev) {
    const btn = ev.target
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].id == btn.closest('.student').dataset.id) {
        this.students = this.moveElementInArray(this.students, i, this.students[i], -1)
        break
      }
    }
    this.save()
    this.studentList.insertBefore(btn.closest('.student'), btn.closest('.student').previousSibling)
  },

  moveDown(ev) {
    const btn = ev.target
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].id == btn.closest('.student').dataset.id) {
        this.students = this.moveElementInArray(this.students, i, this.students[i], 1)
        break
      }
    }
    this.save()
    this.studentList.insertBefore(btn.closest('.student'), btn.closest('.student').nextSibling.nextSibling)
  },

  addStudentViaForm(ev) {
    ev.preventDefault()
    const f = ev.target
    const student = {
      id: this.max + 1,
     name: f.studentName.value,
    }
    f.reset()

  },

  addStudent(student) {
    this.students.unshift(student)

    const listItem = this.buildListItem(student)
    this.prependChild(this.studentList, listItem)
    if (student.id > this.max) {
      this.max = student.id
    }
    this.save()
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
    li.querySelector('button.up').addEventListener('click', this.moveUp.bind(this))
    li.querySelector('button.down').addEventListener('click', this.moveDown.bind(this))
    return li
  },

  removeClassName(el, className){
    el.className = el.className.replace(className, '').trim()
  }
}
megaroster.init('#studentList')
// for moving items in list clone the thing and insert it before the child above it