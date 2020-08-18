const { date } = require('../../lib/utils')
const Member = 	require('../model/member')

module.exports = {
  index (req, res) {
    Member.all(function (members) {
      return res.render('members/index', { members })
    })
  },
  create (req, res) {
    Member.instructorsSelectOptions(function (options) {
      res.render('members/create', { instructorsOptions: options })
    })
  },
  post (req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] === '') return res.send('Please, fill all fields')
    }
    Member.create(req.body, function (members) {
      return res.redirect(`/members/${members.id}`)
    })
  },
  show (req, res) {
    Member.find(req.params.id, function (member) {
      if (!member) return res.send('member not found')

      member.birth = date(member.birth).birthday

      return res.render('members/show', { member })
    })
  },
  edit (req, res) {
    Member.find(req.params.id, function (member) {
      if (!member) return res.send('member not found')

      member.birth = date(member.birth).iso

      Member.instructorsSelectOptions(function (options) {
        res.render('members/edit', { member, instructorsOptions: options })
      })
    })
  },
  put (req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] === '') return res.send('Please, fill all fields')
    }
    Member.update(req.body, function () {
      return res.redirect(`/members/${req.body.id}`)
    })
  },
  delete (req, res) {
    Member.delete(req.body.id, function () {
      return res.redirect('/members')
    })
  }
}
