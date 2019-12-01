class PatientsController < ApplicationController
    before_action :authenticate_user!

def index
    @patients = Patient.all
end
def new
    @user = current_user.id
    @medications = Medication.all
end

def create
    @patient = Patient.new(patient2_params)
    @patient.save

    redirect_to @patient
end


def show
    @patient = Patient.find(params[:id])
end

def edit
    @patient = Patient.find(params[:id])
end

def update
    @patient = Patient.find(params[:id])
  
    @patient.update(patient_params)
    redirect_to @patient
  end

  def destroy
    @patient = Patient.find(params[:id])
    @patient.destroy
  
    redirect_to root_path
  end
private
def patient2_params
    params.require(:patients).permit(:name, :phone, :email, :diagnosis, :user_id, :medication_ids => [])

end

def patient_params
    params.require(:patient).permit(:name, :phone, :email, :diagnosis, :user_id)
end
end
