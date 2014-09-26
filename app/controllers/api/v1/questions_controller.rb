module Api
  module V1
    class QuestionsController < ApplicationController

      respond_to :json

      def index
        @questions = Question.all
      end

      def show
        @question = Question.find(params[:id])
      end

      def create
        @question = Question.new(params[:question])

        @question.user = current_user

        if @question.save
          @question
        else
          render action: "new"
        end
      end

      def update
        @question = Question.find(params[:id])
        @question.update_attributes(params[:question])
        @question
      end

      def destroy
        respond_with Question.destroy(params[:id])
      end

      def new_view
        @question = Question.find(params[:id])
        @question.views += 1
        @question.save
        @question
      end

      def search_question
        unless params[:question][:search].nil?
          @questions = Question.where("subject NOT LIKE ?", "%#{params[:question][:search]}%")
          @questions
        else
          nil
        end
      end
    end
  end
end