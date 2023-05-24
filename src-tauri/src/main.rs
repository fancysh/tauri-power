use std::process::Command;
use tauri::api::event;

#[tauri::command]
async fn load(window: tauri::Window, url: String, path: String) {
    let output = Command::new("git")
        .args(&["clone", &url, &path])
        .output()
        .expect("failed to execute process");

    let result = String::from_utf8_lossy(&output.stdout).to_string();
    event::emit(&window, "load-event", Some(result)).unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![load])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
