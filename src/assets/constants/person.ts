export interface PersonInterface {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}

export const PERSON_DATA: PersonInterface[] = generatePerson(150);

function generatePerson(countData: number){
    let person: PersonInterface[]  = [];
    const firstNames = [
        'john', 'alice', 'bob', 'carol', 'david', 'emily', 'frank', 'grace', 'henry', 'irene',
        'jack', 'kate', 'michael', 'nancy', 'oliver', 'patricia', 'robert', 'samantha', 'tom', 'victoria'
    ];
      
    const lastNames = [
        'smith', 'johnson', 'williams', 'jones', 'brown', 'davis', 'miller', 'wilson', 'moore', 'taylor',
        'anderson', 'thomas', 'jackson', 'white', 'harris', 'martin', 'thompson', 'garcia', 'martinez', 'robinson',
    ];
    
    for (let i = 1; i <= countData; i++) {
        const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const randomUsername = generateRandomUsername(randomFirstName, randomLastName);
        const randomEmail = generateRandomEmail(randomUsername);
    
        person.push({
            username: randomUsername,
            firstName: randomFirstName.charAt(0).toUpperCase() + randomFirstName.slice(1),
            lastName: randomLastName.charAt(0).toUpperCase() + randomLastName.slice(1),
            email: randomEmail
        });
    }
    
    return person;
}


function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
function generateRandomUsername(firstName: string, lastName: string): string {
    const randomNumber = getRandomInt(1, 9999);
    const randomSuffix = randomNumber.toString().padStart(4, '0');
    const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    const usernameVariants = [
        `${firstName}.${lastName}`,
        `${firstName}_${lastName}`, 
        `${firstName}${lastName}`, 
        `${firstName}${randomSuffix}`,
        `${firstName}.${randomChar}`,
        `${firstName}_${randomChar}`
    ];

    return usernameVariants[Math.floor(Math.random() * usernameVariants.length)];
}

function generateRandomEmail(username: string): string {
    const domains = ['example.com', 'test.com', 'company.com', 'mail.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${username}@${randomDomain}`;
}

