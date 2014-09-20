QuestionProject::Application.routes.draw do

  devise_for :users

  root :to => 'questions#index'

  resources :questions

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :questions
    end

  end
  
end
