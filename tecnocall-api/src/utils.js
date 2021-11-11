function formatDate(date) {
  const ano = date.substring(0, 4)
  const mes = date.substring(4, 6)
  const dia = date.substring(6, 8)

  return `${ano}-${mes}-${dia}`
}

module.exports = {
  formatDate
}