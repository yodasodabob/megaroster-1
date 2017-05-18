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

  moveElementInArray (array, value, item, positionChange) {
    let oldIndex = value;
    console.log(oldIndex)
    if (oldIndex > -1){
      let newIndex = (oldIndex + positionChange);

      if (newIndex < 0){
        newIndex = 0
      }else if (newIndex >= array.length){
        newIndex = array.length
      }
      console.log(newIndex)
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
    console.log(this)
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
    console.log(this)
    this.studentList.insertBefore(btn.closest('.student'), btn.closest('.student').nextSibling.nextSibling)
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