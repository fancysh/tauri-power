/*
 * @Author: fangyi fang@zhongan.com
 * @Date: 2023-03-14 15:34:41
 * @LastEditors: fangyi fang@zhongan.com
 * @LastEditTime: 2023-05-10 17:11:47
 * @FilePath: /my-tauri/src-tauri/src/main.rs
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::process::Command;

// git远程项目
#[tauri::command]
fn clone(url: &str, path: &str) -> Result<(), String> {
    let output = Command::new("git")
        .arg("clone")
        .arg(url)
        .arg(path)
        .output()
        .map_err(|e| e.to_string())?;
    
    if !output.status.success() {
        return Err(format!(
            "Git clone failed with error: {}",
            String::from_utf8_lossy(&output.stderr)
        ));
    }

    println!("Git clone successful!");
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            clone])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
