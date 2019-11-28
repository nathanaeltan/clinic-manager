class AppointmentsController < ApplicationController
    protect_from_forgery with: :null_session
    def index
    end

    def patients
        @patients = Patient.all
        render :json => @patients
    end

    def json
        @appointments = Appt.all
        respond_to do |format|
            format.json {
                render :json => @appointments,
                include: [:patient]
            }
          
            format.html
          end
    end

    def create
          @appt =  Appt.new(appt_params)
          @appt.save

        puts "///////////?REQUESWT AKSJBNASKDNJASDKJBAS " 
        puts params
    end

    private

    def appt_params
        params.require(:appointment).permit(:patient_id, :time)
    end
end
