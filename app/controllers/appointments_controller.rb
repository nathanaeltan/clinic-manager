class AppointmentsController < ApplicationController
    protect_from_forgery with: :null_session
    def index
    end

    def patients
        @patients = Patient.all
        
        respond_to do |format| 
            format.json {
                render :json => @patients,
                include: []
            }
          
            format.html
          end
        # @patients = MedicationPatient.all
        
        # respond_to do |format|
        #     format.json {
        #         render :json => @patients,
        #         include: [:patient, :medication]
        #     }
          
        #     format.html
        #   end

       
    end

    def allAppts
        @appointments = Appt.all
        @medPat = MedicationPatient.all
        respond_to do |format|
            format.json {
                render :json => @appointments,
                :include => {
                    :patient => {
                        :include => :medications 
                    }
                }
               
            }
          
            format.html
          end
    end

    def create
          @appt =  Appt.new(appt_params)
          @appt.save

    end

    private

    def appt_params
        params.require(:appointment).permit(:patient_id, :time)
    end
end
