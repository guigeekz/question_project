module Api
  module V1
    class AnswersController < ApplicationController

      respond_to :json

      def index
        respond_with Answer.all
      end

      def show
        respond_with Answer.find(params[:id])
      end

      def create
        @answer = Answer.new(params[:answer])

        @answer.user = current_user

        if @answer.save
          @answer
        else
          render action: "new"
        end
      end

      def update
        @answer = Answer.find(params[:id])
        @answer.update_attributes(params[:answer])
        @answer
      end

      def destroy
        respond_with Answer.destroy(params[:id])
      end

      def answer_on_specific_question
        @answers = Answer.where("question_id = ?", params[:question_id])
      end 
    end
  end
end