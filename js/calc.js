const calc = {
	current: '0',
	prev: '',
	operation: null,
	display__prev: document.querySelector('.display__prev'),
	display__current: document.querySelector('.display__current'),

	reset() {
		this.current = '0';
		this.prev = '';
		this.operation = null;
	},
	
	display_update() {
		this.display_current_update();
		this.display_prev_update();
	},

	display_current_update() {
		this.display__current.innerText = this.current;
	},

	display_prev_update() {
		this.display__prev.innerText = this.prev;
	},

	delete_last() {
		// delete last symbol in current
		this.current = this.current.toString();

		console.log(this.current.length);
		if (this.current.length === 0) { return; }
		if (this.current.length === 1) { this.current = '0'; return;}

		this.current = this.current.slice(0, -1);
	},

	choose_tool(tool_name) {
		switch(tool_name) {
			case 'C': {
				this.reset(); break;
			}
			case 'R': {
				this.current = Math.random() ; break;
			}
			case '⌫': {
				this.delete_last();
			}
		}
	},

	choose_operation(operation_name) {
		const operations = '÷×-+%';
		if (operation_name == '=') {
			this.equaling();
			return;
		}

		if (!operations.includes(operation_name)) { return; }

		if (this.prev != '' && this.current != '0') {
			this.equaling();
			return;
		}

		this.operation = operation_name;
		this.prev = this.current;
		this.display__prev.innerText = `${this.current} ${this.operation}`;
		this.current = '0';
	},
	
	equaling() {
		let result = 0;
		
		if (isNaN(this.prev) || isNaN(this.current)) { return; }

		switch(this.operation) {
			case '÷': {
				result = Number.parseFloat(this.prev) / Number.parseFloat(this.current);
				break;
			}
			case '×': {
				result = Number.parseFloat(this.prev) * Number.parseFloat(this.current);
				break;
			}
			case '-': {
				result = Number.parseFloat(this.prev) - Number.parseFloat(this.current);
				break;
			}
			case '+': {
				result = Number.parseFloat(this.prev) + Number.parseFloat(this.current);
				break;
			}
			case '%': {
				result = (Number.parseFloat(this.prev) * Number.parseFloat(this.current) / 100);
				break;
			}

			default: return;
		}
		if (isNaN(result)) { return; }

		this.current = result.toString();
		this.display__prev.innerText = '';
		this.prev = '';
	},

	choose_number(num) {
		if (num === '.') {
			if (this.current.includes(num)) { return; }
			this.current += num;
		}

		if (num >= 0 && num < 10) {
			if (this.current === '0') {
				this.current = num;
				return;
			}

			this.current += '' + num;
		}
	},
};

const btn_tools = document.querySelectorAll('.tool');
const btn_operations = document.querySelectorAll('.operation');
const btn_numbers = document.querySelectorAll('.number');

btn_tools.forEach((item) => {
	item.addEventListener('click', () => {
		calc.choose_tool(item.innerText);
		calc.display_update();
	});
});

btn_operations.forEach((item) => {
	item.addEventListener('click', () => {
		calc.choose_operation(item.innerText);
		calc.display_current_update();
	});
});

btn_numbers.forEach((item) => {
	item.addEventListener('click', () => {
		calc.choose_number(item.innerText);
		calc.display_current_update();
	});
});