import React from 'react'
import styles from './StatusChip.module.scss'

interface StatusChipProps {
	status: 'active' | 'inactive' | 'dnd'
	loading: boolean
}

const StatusChip: React.FC<StatusChipProps> = ({ status, loading }) => {
	return (
		<span className={styles[status]}>
			{status === 'active' ? 'Active' : status === 'inactive' ? 'Inactive' : 'Do not disturb'}
		</span>
	)
}

export default StatusChip
