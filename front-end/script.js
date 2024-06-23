document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:3001/api/weights')
    if (!response.ok) {
      throw new Error('Failed to fetch weights')
    }
    const data = await response.json()

    const tbody = document.getElementById('data-tbody')
    data.forEach((item) => {
      const newRow = document.createElement('tr')

      const idCell = document.createElement('td')
      idCell.textContent = item.id

      const weightCell = document.createElement('td')
      weightCell.textContent = 'KG: ' +  item.weight

      const formattedTimestamp = new Date(item.timestamp).toLocaleString()
      const timestampCell = document.createElement('td')
      timestampCell.textContent = formattedTimestamp

      const supplierCell = document.createElement('td')
      supplierCell.textContent = item.supplier_id

      const descriptionCell = document.createElement('td')
      descriptionCell.textContent = item.description

      newRow.appendChild(idCell)
      newRow.appendChild(weightCell)
      newRow.appendChild(timestampCell)
      newRow.appendChild(supplierCell)
      newRow.appendChild(descriptionCell)

      tbody.appendChild(newRow)
    })
  } catch (error) {
    console.error('Error fetching weights:', error)
  }
})