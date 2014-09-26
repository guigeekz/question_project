QuestionProject::Application.routes.draw do

  devise_for :users

  root :to => 'questions#index'

  resources :questions

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :questions
      resources :answers

      match '/new_view/:id',                 to: 'questions#new_view', via: 'get', as: 'new_view'
      match '/search_question/',             to: 'questions#search_question', via: 'post', as: 'search_question'
      match '/specific_answer/:question_id', to: 'answers#answer_on_specific_question', via: 'get', as: 'specific_answer'
    end

  end
  
end
