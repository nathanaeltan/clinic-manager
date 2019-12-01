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
       
       
    end

    def allAppts
        @appointments = Appt.all
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

    def update
        @appt = Appt.find(params[:id])
  
        @appt.update(appt_params)
    end

    def destroy
        @appt = Appt.find(params[:id])

        @appt.destroy

    end

    def tests
        @tests = Test.all
        render :json => @tests
    end

    private

    def appt_params
        params.require(:appointment).permit(:patient_id, :time, :phone)
    end
end
