const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn to write and test functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces classes and objects.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Students learn dynamic websites using JavaScript.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Focus on UX, accessibility, and performance.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const container = document.querySelector("#courseContainer");
const total = document.querySelector("#totalCredits");

function display(list) {
    container.innerHTML = "";
    let sum = 0;

    list.forEach(course => {
        const div = document.createElement("div");
        const code = `${course.subject} ${course.number}`;
        const status = course.completed ? "✓" : "";
        div.textContent = `${code} ${status}`;
        container.appendChild(div);
        sum += course.credits;
    });

    total.textContent = sum;
}

display(courses);

document.querySelector("#all").addEventListener("click", () => display(courses));
document.querySelector("#cse").addEventListener("click", () => display(courses.filter(c => c.subject === "CSE")));
document.querySelector("#wdd").addEventListener("click", () => display(courses.filter(c => c.subject === "WDD")));
