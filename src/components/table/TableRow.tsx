import React from 'react'

interface TableRowProps {}

const TableRow: React.FC<TableRowProps> = ({}) => {
	return (
		<tr>
			<td className="whitespace-nowrap px-6 py-4">
				<div className="text-sm text-clr-text">Regional Paradigm Technician</div>
				<div className="text-sm text-clr-bg-grayed">Optimization</div>
			</td>
			<td className="whitespace-nowrap px-6 py-4">
				<span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
					Active
				</span>
			</td>
			<td className="whitespace-nowrap px-6 py-4 text-sm text-clr-bg-grayed">Admin</td>
			<td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
				<a href="#" className="text-indigo-600 hover:text-indigo-900">
					Edit
				</a>
			</td>
		</tr>
	)
}

export default TableRow
