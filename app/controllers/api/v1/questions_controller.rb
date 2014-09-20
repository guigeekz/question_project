module Api
  module V1
    class QuestionsController < ApplicationController

      respond_to :json

      def index
        respond_with Question.all
      end

      def show
        respond_with Question.find(params[:id])
      end

      def create
        @question = Question.new(params[:question])

        @question.user = current_user

        if @question.save
          respond_with @question, notice: 'Question was successfully created.'
        else
          render action: "new"
        end
      end

      def update
        respond_with Question.update(params[:id], params[:question])
      end

      def destroy
        respond_with Question.destroy(params[:id])
      end
    end
  end
end