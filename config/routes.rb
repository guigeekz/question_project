QuestionProject::Application.routes.draw do

  devise_for :users

  root :to => 'questions#index'

  resources :questions

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :questions
      resources :answers

      match '/specific_answer/:question_id', to: 'answers#answer_on_specific_question', via: 'get'
    end

  end
  
end
