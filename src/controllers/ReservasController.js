const Beneficios = require('../models/Beneficios');
const Pessoas = require('../models/Pessoas');
const Quartos = require('../models/Quartos');
const Reservas = require('../models/Reservas');

module.exports = {

    async index(req, res){
        try{

            const { quarto_id} = req.params;

            const reserva = await Reservas.findOne(
                {
                    where:{quarto_id:quarto_id},
                    include: [
                        {
                            model: Pessoas,
                            as: 'ReservasOwner',
                            through: 'reservas_pessoas',
                        }
                    ]
            });

            return res.json(reserva);
        } catch(err){
            console.log(err);
        }
    },

    async store(req, res){
        
        // const { quarto_id } = req.params;
        const { data_inicio, data_final, beneficio_id, quarto_id, pessoas} = req.body;  
        
        const quarto = await Quartos.findOne({where:{id:quarto_id}}); 
        const beneficio = await Beneficios.findOne({where:{id:beneficio_id}});        

        const {valor_quarto} = quarto;
        const {valor_beneficio} = beneficio;   
        
        const data_checkout = data_final;

        let diferencaDatas = new Date(data_final).getTime()-new Date(data_inicio).getTime();
        valor_diarias = valor_quarto*(Math.ceil(diferencaDatas / (1000 * 3600 * 24)));

        console.log(Math.ceil(diferencaDatas / (1000 * 3600 * 24)));

        valores_beneficios =  valor_beneficio;                         
        
        try{
            const reserva = await Reservas.create({data_inicio, data_final, data_checkout, valor_diarias, valores_beneficios, quarto_id});            

            reserva.setPessoasOwner(pessoas);
            console.log(pessoas);
            // reserva.setBeneficios(beneficios)

            return res.json(reserva);
        }catch(err){
            console.log(err);
        }
    },

    async addHospede(req, res){

    }
}