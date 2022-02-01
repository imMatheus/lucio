import React from 'react'

interface TableRowProps {}

const TableRow: React.FC<TableRowProps> = ({}) => {
	return (
		<tr>
			<td className="px-6 py-4 whitespace-nowrap">
				<div className="text-sm text-neutral-900">Regional Paradigm Technician</div>
				<div className="text-sm text-neutral-500">Optimization</div>
			</td>
			<td className="px-6 py-4 whitespace-nowrap">
				<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
					Active
				</span>
			</td>
			<td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">Admin</td>
			<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
				<a href="#" className="text-indigo-600 hover:text-indigo-900">
					Edit
				</a>
			</td>
		</tr>
	)
}

export default TableRow
