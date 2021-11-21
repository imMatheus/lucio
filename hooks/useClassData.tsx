import React, { useState, useEffect } from 'react';
import getClass from '@/firebase/querys/getClass';
import ClassType from '@/types/ClassType';
import User from '@/types/User';

export default function useClassData(
	// setState: React.Dispatch<React.SetStateAction<ClassType | null>>,
	user: User | null,
	id: string | string[] | undefined
) {
	const [state, setState] = useState<ClassType | null>(null);

	useEffect(() => {
		async function dummy() {
			// if (!id) return alert('line 28 failed');
			if (!id) return console.log('failed on line 15');
			let response = await getClass(user, Array.isArray(id) ? id[0] : id);
			console.log(
				'responseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponseresponse'
			);
			console.log(response);

			setState(response);
		}
		dummy();
	}, [id, user]);
	return state;
}
