import React, { useState } from 'react';
import type { NextPage } from 'next';
import ClassNavbar from '@/components/classes/ClassNavbar';
import { storage } from '@/firebase/index';
import CreateHomework from '@/components/classes/CreateHomework';

const Index: NextPage = () => {
	return (
		<div className="px-6 py-3">
			<ClassNavbar />
			homework
			<CreateHomework />
		</div>
	);
};

export default Index;
