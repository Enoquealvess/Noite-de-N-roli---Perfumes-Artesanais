window.onload = function() {
    const form = document.getElementById('address-form');
    const cepInput = document.getElementById('cep');

    cepInput.addEventListener('blur', function() {
        const cep = this.value.replace(/\D/g, '');
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        document.getElementById('street').value = data.logradouro;
                        document.getElementById('neighborhood').value = data.bairro;
                        document.getElementById('city').value = data.localidade;
                        document.getElementById('state').value = data.uf;
                    } else {
                        alert('CEP não encontrado');
                        clearFields();
                    }
                })
                .catch(() => alert('Erro ao buscar o CEP'));
        } else {
            alert('CEP inválido');
            clearFields();
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (document.getElementById('name').value.trim() === '') {
            alert('Nome é obrigatório');
            return;
        }
        if (document.getElementById('street').value === '') {
            alert('Preencha um CEP válido');
            return;
        }
        alert('Formulário enviado');
        form.reset();
    });

    function clearFields() {
        document.getElementById('street').value = '';
        document.getElementById('neighborhood').value = '';
        document.getElementById('city').value = '';
        document.getElementById('state').value = '';
    }
};
