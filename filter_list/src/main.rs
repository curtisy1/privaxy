use async_recursion::async_recursion;
use log::{debug, error, info, trace, warn};
use serde::{Serialize, Deserialize};
use std::{fs};
use std::fs::{File};
use std::io::{BufReader, Write};
use std::path::Path;

#[derive(Serialize, Deserialize, Debug)]
enum FilterGroup {
    DEFAULT,
    REGIONAL,
    ADS,
    PRIVACY,
    MALWARE,
    SOCIAL,
}

#[derive(Serialize, Deserialize, Debug)]
struct FilterList {
    filter_group: FilterGroup,
    url: String,
    title: String,
    #[serde(default)]
    enabled_by_default: bool,
}

async fn download_filter(file: &Path) -> Result<(), Box<dyn std::error::Error>> {
    let f = File::open(file)?;
    let reader = BufReader::new(f);
    let filter_list: Vec<FilterList> = serde_json::from_reader(reader)?;

    let client = reqwest::Client::new();
    for filter in filter_list {
        let mut file_name = String::from("./registry/");
        file_name.push_str(&filter.title);
        file_name.push_str(".txt");
        let path = Path::new(file_name.as_str());
        if path.exists() {
            debug!("File {} already downloaded. Skipping", file_name);
            continue;
        }

        info!("Downloading filter...");
        let result = client.get(filter.url)
            .send()
            .await?
            .text()
            .await?;

        debug!("Saving file {}", file_name);
        let mut new_file = File::create(path)?;
        new_file.write(result.as_bytes())?;
    }

    info!("Done downloading filters");
    Ok(())
}

#[async_recursion]
async fn traverse_filters(dir: &Path) -> Result<(), Box<dyn std::error::Error>> {
    if dir.is_dir() {
        for entry in fs::read_dir(dir)? {
            let entry = entry?;
            let path = entry.path();
            if path.is_dir() {
                traverse_filters(&path).await?;
            } else {
                download_filter(&path).await?;
            }
        }
    }

    Ok(())
}

fn setup_logger() -> Result<(), fern::InitError> {
    fern::Dispatch::new()
        .format(|out, message, record| {
            out.finish(format_args!(
                "{}[{}][{}] {}",
                chrono::Local::now().format("[%Y-%m-%d][%H:%M:%S]"),
                record.target(),
                record.level(),
                message
            ))
        })
        .level(log::LevelFilter::Debug)
        .chain(std::io::stdout())
        .chain(fern::log_file("output.log")?)
        .apply()?;
    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    setup_logger()?;
    traverse_filters(Path::new("./lists")).await?;
    Ok(())
}
