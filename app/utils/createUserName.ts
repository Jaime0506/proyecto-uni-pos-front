export const createUserName = (
	firstName: string,
	lastName: string,
	nationalId: string,
) => {
	const clean = (str: string) =>
		str
			.normalize('NFD') // descompone tildes y diacríticos
			.replace(/[\u0300-\u036f]/g, '') // elimina diacríticos
			.replace(/ñ/g, 'n')
			.replace(/Ñ/g, 'n')
			.toLowerCase()
			.split(' ')[0]
			.trim();

	return `${clean(firstName)}.${clean(lastName)}${nationalId.slice(-3)}`;
};